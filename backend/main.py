from fastapi import FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware
import db

app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])


@app.post("/create/")
def create_item(item: dict):
    print("create_item!", item)
    result = db.insert_item(item)
    print(result)
    return result


@app.get("/read/{item_id}")
def read_item(item_id: int):
    print("read_item", item_id)
    result = db.search_item({'id': item_id})
    print(result)
    return result


@app.put("/update/{item_id}")
def update_item(item_id: int, updated_item: dict):
    print('update_item', updated_item)
    result = db.update_item(
        {'id': item_id, 'title': updated_item['title'], 'description': updated_item['description']})
    return result


@app.delete("/delete/{item_id}")
def delete_item(item_id: int):
    print('delete', item_id)
    result = db.delete_item({'id': item_id})
    return result
