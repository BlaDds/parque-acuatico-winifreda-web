import urllib.request
import json
import os
import logging
import traceback

BEHOLD_URL = "https://feeds.behold.so/e9KFIu3A7sLhKRRW8sJz"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

OUTPUT_FILE = os.path.join(BASE_DIR, "..", "instagram_feed.json")
LOG_FILE = os.path.join(BASE_DIR, "feed_update.log")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOG_FILE, encoding='utf-8'),
        logging.StreamHandler()
    ]
)

def update_feed():
    try:
        logging.info(f"Iniciando conexión a Behold...")
        
        req = urllib.request.Request(BEHOLD_URL, headers={'User-Agent': 'Mozilla/5.0'})
        
        with urllib.request.urlopen(req, timeout=20) as response:
            raw_content = response.read().decode()
            data = json.loads(raw_content)
            
            posts_data = []
            
            if isinstance(data, list):
                # Por si Behold devuelve lista directa
                posts_data = data
            elif isinstance(data, dict) and 'posts' in data:
                # Por si Behold devuelve objeto con key 'posts'
                posts_data = data['posts']
            else:
                logging.warning("⚠️ El JSON no tiene formato de lista ni llave 'posts'.")
            
            logging.info(f"✔ Se encontraron {len(posts_data)} publicaciones.")

            final_posts = []
            for item in posts_data:
                media_type = item.get('mediaType', 'IMAGE')
                
                img_src = item.get('mediaUrl')
                
                if media_type == 'VIDEO' and item.get('thumbnailUrl'):
                    img_src = item.get('thumbnailUrl')

                # Manejo seguro de IDs
                post_id = item.get('id', 'no-id')

                final_posts.append({
                    "id": post_id,
                    "mediaUrl": img_src, 
                    "permalink": item.get('permalink'),
                    "caption": item.get('caption', ''),
                    "mediaType": media_type,
                    "thumbnailUrl": item.get('thumbnailUrl', img_src)
                })

            # Asegura directorio por las dudas
            os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)

            with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
                json.dump(final_posts, f, ensure_ascii=False, indent=2)
            
            logging.info(f"✔ JSON actualizado exitosamente en: {OUTPUT_FILE}")

    except Exception as e:
        logging.error("❌ Error crítico actualizando el feed.")
        logging.error(traceback.format_exc())

if __name__ == "__main__":
    update_feed()