"""Generate the two downloadable, evidence-aligned portfolio CVs.

Run with: python3 scripts/generate-cvs.py
"""

from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "cv"
OUTPUT.mkdir(parents=True, exist_ok=True)

font_pairs = [
    (Path("/System/Library/Fonts/Supplemental/Arial.ttf"), Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf")),
    (Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"), Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")),
    (Path("C:/Windows/Fonts/arial.ttf"), Path("C:/Windows/Fonts/arialbd.ttf")),
]
font_pair = next(((regular, bold) for regular, bold in font_pairs if regular.exists() and bold.exists()), None)
if font_pair is None:
    raise RuntimeError("Install Arial or DejaVu Sans to generate the CV PDFs.")
pdfmetrics.registerFont(TTFont("ArialPortfolio", str(font_pair[0])))
pdfmetrics.registerFont(TTFont("ArialPortfolio-Bold", str(font_pair[1])))
pdfmetrics.registerFontFamily("ArialPortfolio", normal="ArialPortfolio", bold="ArialPortfolio-Bold")

INK = colors.HexColor("#171722")
MUTED = colors.HexColor("#5b6070")
ACCENT = colors.HexColor("#6544bc")

styles = {
    "name": ParagraphStyle("name", fontName="ArialPortfolio-Bold", fontSize=19, leading=22, textColor=INK, spaceAfter=3),
    "role": ParagraphStyle("role", fontName="ArialPortfolio", fontSize=9.2, leading=11, textColor=ACCENT, spaceAfter=6),
    "contact": ParagraphStyle("contact", fontName="ArialPortfolio", fontSize=8, leading=10, textColor=MUTED, spaceAfter=10),
    "section": ParagraphStyle("section", fontName="ArialPortfolio-Bold", fontSize=9, leading=11.5, textColor=ACCENT, spaceBefore=10, spaceAfter=4),
    "body": ParagraphStyle("body", fontName="ArialPortfolio", fontSize=8.8, leading=11.8, textColor=INK, alignment=TA_LEFT, spaceAfter=3),
    "item": ParagraphStyle("item", fontName="ArialPortfolio", fontSize=8.8, leading=11.8, textColor=INK, leftIndent=10, firstLineIndent=-7, spaceAfter=2),
    "title": ParagraphStyle("title", fontName="ArialPortfolio-Bold", fontSize=8.9, leading=11.7, textColor=INK, spaceBefore=5, spaceAfter=1.5),
    "small": ParagraphStyle("small", fontName="ArialPortfolio", fontSize=8.4, leading=11.2, textColor=INK, spaceAfter=2.5),
}


def P(text, kind="body"):
    return Paragraph(text, styles[kind])


def section(story, label):
    story.append(P(label.upper(), "section"))
    story.append(HRFlowable(width="100%", thickness=0.45, color=colors.HexColor("#d8d3e2"), spaceAfter=4))


def bullet(story, text):
    story.append(P("• " + text, "item"))


def role(story, title, period):
    story.append(P(f"{escape(title)} <font color='#5b6070'>| {escape(period)}</font>", "title"))


def linked(text, url):
    return f'<link href="{url}" color="#5b6070">{escape(text)}</link>'


def common_header(story, role_name):
    story.append(P("Rümeysa Ahsen Çiçek", "name"))
    story.append(P(role_name, "role"))
    story.append(P(
        "Istanbul, Türkiye  ·  "
        + linked("ahsen.cicek752@gmail.com", "mailto:ahsen.cicek752@gmail.com")
        + "  ·  +90 551 152 39 12  ·  "
        + linked("Portfolio", "https://rumeysahsencicekdesign.tech")
        + "  ·  "
        + linked("GitHub", "https://github.com/RAhsencicek")
        + "  ·  "
        + linked("LinkedIn", "https://linkedin.com/in/rahsencicek/"),
        "contact",
    ))


def common_experience(story, ai_first=False):
    section(story, "Experience")
    role(story, "Atasayar Teknoloji (Codlean) — AI Engine Developer", "Feb–Jun 2026 · Düzce, Türkiye")
    bullet(story, "Built Kafka and FastAPI pipelines for live customer machine data, validation and state management; delivered the working system to the team for subsequent SCADA screen integration.")
    bullet(story, "Developed an XGBoost fault prediction model (AUC 98.5%) with SHAP and DLIME explanations.")
    bullet(story, "Deployed Llama 3.1 8B on-premise and built a five-agent decision workflow, APIs and an operator-facing dashboard used together with real customer data.")
    if not ai_first:
        bullet(story, "Built a token-authenticated FastAPI gateway with OpenAPI documentation and a 21-test pytest suite.")
    role(story, "Kriptarium — Software & AI Engineer Intern", "Aug–Oct 2025 · Elazığ, Türkiye")
    bullet(story, "Benchmarked 20+ CNN and ViT architectures on the 33-class DIBaS dataset; achieved 95.45% top-1 accuracy.")
    bullet(story, "Prepared ONNX Runtime, CoreML and TorchScript deployment paths and developed an Android companion app with Kotlin and Jetpack Compose.")
    bullet(story, "Joined the TÜBİTAK BiGG CUBE entrepreneurship program with teammates; our application was shortlisted.")


def common_projects(story, ai_first=False):
    section(story, "Selected projects")
    role(story, "Sa-Ra — Resilient emergency communication", "2024–2025")
    bullet(story, "Led a three-person team developing ESP32 BLE / LoRa mesh communication, Python signal simulations, adaptive modulation, anti-jamming strategies and an iOS companion app. TEKNOFEST 2025 finalist; TÜBİTAK 2209-A funded.")
    if ai_first:
        role(story, "VisionVet-AI — Mobile veterinary imaging", "2025")
        bullet(story, "Worked on CNN-based microscopy image analysis and mobile inference with ONNX and CoreML in coordination with clinical partners.")
        role(story, "GreenGuard — Smart plant analytics", "2025–2026")
        bullet(story, "Built a C# / .NET desktop decision-support workflow with sensor anomaly detection and NLP-based care recommendations.")
    else:
        role(story, "Pharmora — B2B pharmaceutical exchange", "2024–2025")
        bullet(story, "Built a React dashboard, Node.js / Express API, MongoDB data layer and SwiftUI mobile client with barcode scanning and OpenFDA integration.")
        role(story, "Metrika — Real-time KPI dashboard", "2024–2025")
        bullet(story, "Led the React / TypeScript frontend in a three-person team; deployed the interface on Vercel.")
        role(story, "Ergin Soy İnşaat — Client website", "2024")
        bullet(story, "Designed and published a responsive corporate website for a construction company as a freelance project.")
        role(story, "GreenGuard — Smart plant analytics", "2025–2026")
        bullet(story, "Built a C# / .NET desktop decision-support workflow with sensor anomaly detection and NLP-based care recommendations.")


def common_research(story):
    section(story, "Research and recognition")
    bullet(story, "Two ICSIS 2025 conference papers: DIBaS CNN/ViT comparison (proceedings p. 54) and LGS question generation / dataset study (p. 778). " + linked("Proceedings", "https://drive.google.com/file/d/1pjG0aHZw5piFt4Lz5OUdwhewleO_YBNg/view") + ".")
    bullet(story, "LGS Turkish Question Dataset v1.0, " + linked("Zenodo DOI 10.5281/zenodo.18304976", "https://doi.org/10.5281/zenodo.18304976") + ".")


def common_education(story):
    section(story, "Education")
    story.append(P("<b>Fırat University</b> — B.Sc. Software Engineering, Jul 2026 · GPA 3.00/4.00", "small"))
    story.append(P("<b>Anadolu University</b> — Business Administration, distance study, 2024–2026", "small"))


def build(filename, variant):
    target = OUTPUT / filename
    doc = SimpleDocTemplate(str(target), pagesize=A4, leftMargin=38, rightMargin=38, topMargin=31, bottomMargin=29, title=f"Rümeysa Ahsen Çiçek — {variant} CV", author="Rümeysa Ahsen Çiçek")
    story = []
    common_header(story, "Software Engineer · Industrial AI & Full-Stack" if variant == "Software Engineer" else "AI / ML Engineer · Industrial AI & Computer Vision")
    section(story, "Profile")
    if variant == "Software Engineer":
        story.append(P("Software Engineering graduate building systems across live data, AI, APIs and user interfaces. Delivered an end-to-end industrial AI engine with real customer machine data; led a TEKNOFEST finalist team and built web, mobile and desktop products."))
    else:
        story.append(P("Software Engineering graduate focused on industrial AI and computer vision. Delivered a working predictive-maintenance engine with live customer data, an on-premise LLM and specialized agents; benchmarked 20+ medical-imaging models and contributed to two conference papers."))
    common_experience(story, ai_first=variant != "Software Engineer")
    common_projects(story, ai_first=variant != "Software Engineer")
    common_research(story)
    common_education(story)
    section(story, "Technical skills")
    if variant == "Software Engineer":
        story.append(P("<b>Languages:</b> Python, TypeScript, Swift, Kotlin, C/C++, C#  ·  <b>Backend:</b> FastAPI, Node.js, Express, Kafka, REST APIs, Docker, PostgreSQL, MongoDB  ·  <b>Interfaces:</b> React, SwiftUI, Jetpack Compose, .NET  ·  <b>AI:</b> XGBoost, PyTorch, SHAP, ONNX, CoreML  ·  <b>Testing:</b> pytest, JUnit, XCTest, GitHub Actions", "small"))
    else:
        story.append(P("<b>ML:</b> PyTorch, TensorFlow, Keras, XGBoost, scikit-learn, SHAP, DLIME, Llama 3.1, multi-agent systems  ·  <b>Deployment:</b> ONNX Runtime, CoreML, TorchScript, FastAPI, Docker  ·  <b>Data:</b> Python, Pandas, NumPy, SQL, Kafka  ·  <b>Product:</b> React, SwiftUI, Kotlin, .NET  ·  <b>Testing:</b> pytest, JUnit, XCTest", "small"))
    doc.build(story)
    print(target)


if __name__ == "__main__":
    build("rumeysa-ahsen-cicek-software-engineer.pdf", "Software Engineer")
    build("rumeysa-ahsen-cicek-ai-ml-engineer.pdf", "AI / ML Engineer")
