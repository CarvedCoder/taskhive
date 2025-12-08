from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List
from app.api.deps import get_current_user
from app.schemas.todo import TodoCreate, TodoUpdate, TodoOut
from app.db.supabase_client import get_global_supabase

router = APIRouter(prefix="/todos", tags=["todos"])

@router.post("/", response_model=TodoOut, status_code=status.HTTP_201_CREATED)
async def create_todo(payload: TodoCreate, user=Depends(get_current_user)):
    supabase = get_global_supabase()
    if supabase is None:
        raise HTTPException(status_code=500, detail="Supabase client not initialized")
    resp = await supabase.table("todos").insert({
        "user_id": user["id"],
        "title": payload.title,
        "description": payload.description,
        "due_date": payload.due_date,
        "completed": payload.completed
    }).execute()
    data = getattr(resp, "data", None) or resp.get("data", None) or resp
    if not data:
        raise HTTPException(status_code=500, detail="Insert failed")
    return data[0]

@router.get("/", response_model=List[TodoOut])
async def list_todos(user=Depends(get_current_user), limit: int = Query(20, ge=1, le=100), offset: int = 0):
    supabase = get_global_supabase()
    resp = await supabase.table("todos").select("*").eq("user_id", user["id"]).order("created_at", {"ascending": False}).limit(limit).offset(offset).execute()
    data = getattr(resp, "data", None) or resp.get("data", None) or resp
    return data

@router.get("/{todo_id}", response_model=TodoOut)
async def get_todo(todo_id: int, user=Depends(get_current_user)):
    supabase = get_global_supabase()
    resp = await supabase.table("todos").select("*").eq("id", todo_id).eq("user_id", user["id"]).single().execute()
    data = getattr(resp, "data", None) or resp.get("data", None) or resp
    if not data:
        raise HTTPException(status_code=404, detail="Todo not found")
    return data

@router.patch("/{todo_id}", response_model=TodoOut)
async def update_todo(todo_id: int, payload: TodoUpdate, user=Depends(get_current_user)):
    supabase = get_global_supabase()
    updates = payload.model_dump(exclude_unset=True)
    resp = await supabase.table("todos").update(updates).eq("id", todo_id).eq("user_id", user["id"]).select("*").single().execute()
    data = getattr(resp, "data", None) or resp.get("data", None) or resp
    if not data:
        raise HTTPException(status_code=404, detail="Todo not found or not allowed")
    return data

@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(todo_id: int, user=Depends(get_current_user)):
    supabase = get_global_supabase()
    await supabase.table("todos").delete().eq("id", todo_id).eq("user_id", user["id"]).execute()
    return None
