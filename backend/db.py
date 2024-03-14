import psycopg2
import os

# postgres url params, read from sys env variable
# POSTGRES_URL = os.getenv('POSTGRES_URL')
POSTGRES_URL="postgres://default:YXSaqje5Z0zQ@ep-lucky-moon-a4xaxmyq-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"

def execSQL(query):
    try:
        conn = psycopg2.connect(POSTGRES_URL)
        cursor = conn.cursor()
        cursor.execute(query)
        return {'message':'success'}
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return {'message':'fail'}
    finally:
        conn.commit()
        cursor.close()
        conn.close()
        
def searchSQL(query):
    try:
        conn = psycopg2.connect(POSTGRES_URL)
        cursor = conn.cursor()
        cursor.execute(query)
        result = cursor.fetchall()
        if len(result)>=0:
            list = []
            for res in result:
                list.append({'id':res[0],'title':res[1],'description':res[2]})
            return {'message':'success','data':list}
        else:
            return {'message':'fail'}
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return {'message':'fail'}
    finally:
        conn.commit()
        cursor.close()
        conn.close()
        
CREATE_TABLE = '''
CREATE TABLE IF NOT EXISTS TEST (
   ID           INT    NOT NULL,
   TITLE          TEXT       NOT NULL,
   DESCRIPTION    TEXT);

'''
def create_table():
    execSQL(CREATE_TABLE)
    
def insert_item(item):
    id = item['id']
    title = item['title']
    description = item['description']
    query = f'INSERT INTO TEST VALUES (\'{id}\', \'{title}\', \'{description}\');'
    return execSQL(query)
    
def update_item(item):
    id = item['id']
    title = item['title']
    description = item['description']
    query = f'UPDATE TEST SET TITLE =  \'{title}\', DESCRIPTION =  \'{description}\' WHERE ID = \'{id}\';'
    return execSQL(query)
    
def search_item(item):
    id = item['id']
    query = f'SELECT * FROM TEST WHERE ID={id}'
    return searchSQL(query)

def delete_item(item):
    id = item['id']
    query = f'DELETE FROM TEST WHERE ID={id}'
    return execSQL(query)