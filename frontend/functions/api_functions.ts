const API_URL = "http://localhost:8001"; // Updated port to match backend

export async function queryLLM(text: string): Promise<any> {
    const response = await fetch(
        `${API_URL}/digitalocean/query-agent`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    });

    console.log("Response:", response);
    if (!response.ok) {
        throw new Error("Failed to query LLM");
    }
    return response.json();
}