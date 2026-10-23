"""Détoure les burgers générés sur fond vert (#00FF00) et exporte des WebP avec alpha.
Adapté du skill webgl-parallax-hero (chroma key + despill sur les bords uniquement).
Usage (depuis la racine du projet) : python3 -I scripts/cut-burger-layers.py design/burger-cutouts public/images/cutouts

Chaque calque est recalé sur la photo d'origine (1408×768) : même cadrage 16:9, donc il
se superpose pixel pour pixel à l'image de la carte.
"""
import sys
import glob
import os
import json
import numpy as np
from PIL import Image, ImageFilter

src, out = sys.argv[1], sys.argv[2]
W, H = 1408, 768  # taille des photos des cartes


def key(im, erode=3):
    a = np.asarray(im).astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    t = np.clip((g - np.maximum(r, b) - 60) / 60, 0, 1) * np.clip((g - 120) / 60, 0, 1)
    m = Image.fromarray(((1 - t) * 255).astype(np.uint8))
    m = m.filter(ImageFilter.MinFilter(erode)).filter(ImageFilter.GaussianBlur(0.8))
    al = np.asarray(m).astype(np.float32) / 255
    edge = (t > 0.02) | (al < 0.98)
    g2 = np.where(edge, np.minimum(g, np.maximum(r, b) * 0.95), g)  # despill sur les bords seulement
    rgba = np.dstack([np.stack([r, g2, b], -1).astype(np.uint8), (al * 255).astype(np.uint8)])
    return Image.fromarray(rgba, "RGBA")


def poly_mask(size, pts, feather=2):
    from PIL import ImageDraw

    w, h = size
    im = Image.new("L", (w, h), 0)
    ImageDraw.Draw(im).polygon([(x * w, y * h) for x, y in pts], fill=255)
    return im.filter(ImageFilter.GaussianBlur(feather))


# Quand l'IA a laissé une partie du décor (planche, frites) collée au burger, on ne garde que
# le polygone du burger, relevé sur l'image (fractions largeur, hauteur).
POLY = {
    "burger_vegetarien": [
        (0.33, 0.0), (0.668, 0.0), (0.668, 0.705), (0.645, 0.715), (0.645, 0.76),
        (0.622, 0.786), (0.385, 0.786), (0.36, 0.76), (0.36, 0.715), (0.335, 0.705),
    ],
}

manifest = {}
for path in sorted(glob.glob(f"{src}/cut_*.png")):
    name = os.path.basename(path)[4:-4]  # cut_burger_x.png -> burger_x
    im = Image.open(path).convert("RGB").resize((W, H), Image.LANCZOS)
    cut = key(im)
    if name in POLY:
        a = np.asarray(cut).copy()
        a[..., 3] = (a[..., 3] * (np.asarray(poly_mask(cut.size, POLY[name])) / 255)).astype(np.uint8)
        cut = Image.fromarray(a, "RGBA")
    cut.save(f"{out}/{name}.webp", "WEBP", quality=86, method=6)
    bbox = cut.getchannel("A").point(lambda v: 255 if v > 30 else 0).getbbox()
    print(name, "bbox", bbox)
    # base du burger (bas de la boîte englobante) : point d'ancrage du grossissement au survol
    manifest[name] = round(bbox[3] / H, 3)

with open("app/lib/cutouts.json", "w") as f:
    json.dump(manifest, f, indent=2)
print("manifest -> app/lib/cutouts.json")
