from flask import Flask, request, jsonify
from flask_cors import CORS
import youtube_dl
import subprocess
import os

app = Flask(__name__)
CORS(app)  # 启用CORS以允许前端访问

@app.route('/api/download', methods=['POST'])
def download_video():
    youtube_url = request.json['url']
    ydl_opts = {
        'outtmpl': 'downloads/%(id)s.%(ext)s',
        'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
    }
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(youtube_url, download=True)
        filename = f"{info['id']}.{info['ext']}"
    return jsonify({'filename': filename})

@app.route('/api/clip', methods=['POST'])
def clip_video():
    filename = request.json['filename']
    start_time = request.json['start_time']
    end_time = request.json['end_time']
    output_filename = f"clipped_{filename}"
    
    input_path = os.path.join('downloads', filename)
    output_path = os.path.join('outputs', output_filename)
    
    cmd = f"ffmpeg -i {input_path} -ss {start_time} -to {end_time} -c copy {output_path}"
    subprocess.run(cmd, shell=True, check=True)
    
    return jsonify({'clipped_filename': output_filename})

if __name__ == '__main__':
    app.run(debug=True)