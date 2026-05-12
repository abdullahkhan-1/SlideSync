export type ExtractedSlide = {
  slide_number: number;
  title: string;
  content: string;
};

export type ExtractSlidesResponse = {
  filename: string;
  total_slides: number;
  slides: ExtractedSlide[];
};

export async function uploadSlides(file: File): Promise<ExtractSlidesResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:8000/api/extract", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let message = "Failed to process file";
    try {
      const errBody = (await response.json()) as { detail?: unknown };
      const { detail } = errBody;
      if (typeof detail === "string") {
        message = detail;
      } else if (Array.isArray(detail) && detail.length > 0) {
        const first = detail[0];
        if (typeof first === "object" && first !== null && "msg" in first) {
          message = String((first as { msg: string }).msg);
        }
      }
    } catch {
      /* use default */
    }
    throw new Error(message);
  }

  return response.json() as Promise<ExtractSlidesResponse>;
}
