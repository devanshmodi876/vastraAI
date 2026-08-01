from io import BytesIO
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

def generate_prediction_pdf(data):
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer)
    styles = getSampleStyleSheet()
    elements = []

    elements.append(Paragraph("<b>VastraAI Prediction Report</b>", styles["Title"]))
    elements.append(Paragraph(f"<b>Prediction:</b> {data['prediction']}", styles["Normal"]))
    elements.append(Paragraph(f"<b>Confidence:</b> {data['confidence']}%", styles["Normal"]))
    elements.append(Paragraph(f"<b>State:</b> {data['state']}", styles["Normal"]))
    elements.append(Paragraph(f"<b>Technique:</b> {data['technique']}", styles["Normal"]))
    elements.append(Paragraph(f"<b>Fabric:</b> {data['fabric']}", styles["Normal"]))
    elements.append(Paragraph(f"<b>Description:</b> {data['description']}", styles["BodyText"]))

    doc.build(elements)

    buffer.seek(0)
    return buffer