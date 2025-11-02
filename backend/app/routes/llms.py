from fastapi import APIRouter, Request
from ..utils.cleaning import normalize_units, normalize_dates
import openai
import os

AGENT_ENDPOINT = str(os.getenv("AGENT_ENDPOINT")) + "/api/v1/"
AGENT_ACCESS_KEY = str(os.getenv("AGENT_ACCESS_KEY"))

router = APIRouter(prefix="/digitalocean", tags=["digitalocean"])

@router.post("/query-agent")
async def query_agent(request: Request):
    payload = await request.json()
    payload_text = payload.get("text", "")

    if not payload_text:
        return {"error": "No text provided in the payload."}
    if len(payload_text) > 2000:
        return {"error": "Text exceeds maximum length of 2000 characters."}

    # Normalize the text
    normalized_text = normalize_units(payload_text)
    normalized_text = normalize_dates(normalized_text)

    print("Final Payload:\n", payload)

    client = openai.OpenAI(
        base_url = AGENT_ENDPOINT,
        api_key = AGENT_ACCESS_KEY
    )

    response = client.chat.completions.create(
        model = "n/a",
        messages = [{"role": "user", "content": normalized_text}],
        extra_body = {"include_retrievals": True}
    )

    response_dict = response.model_dump()
    resp_content = response_dict["choices"][0]["message"]["content"]
    print("response_dict:", resp_content)
    return resp_content


