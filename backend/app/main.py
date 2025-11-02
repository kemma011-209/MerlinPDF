from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.llms import router as llm_router
app = FastAPI(title="AI Todo API", 
              version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello from FastAPI!"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "FastAPI Todo API"}

app.include_router(llm_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True) 