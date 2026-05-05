import os
from googleapiclient.discovery import build
from dotenv import load_dotenv
load_dotenv()


api_key= os.getenv("YOUTUBE_API_KEY")
youtube_connection= build("youtube", "v3", developerKey=api_key)
print(youtube_connection)

video_id = "1lCSoPYtZl0"
video_id_1 = "1cg0huq00I4"
video_id_2 = "wen1BmMaShQ"
video_id_3 = "kTB-ypmiIzo"


def get_video_details(video_id):
    kiyan_video_details = youtube_connection.videos().list(
        part= "snippet,statistics",
        id = video_id
    ).execute()
    title  = kiyan_video_details['items'][0]['snippet']['title']
    description = kiyan_video_details['items'][0]['snippet']['description']
    view_count = kiyan_video_details['items'][0]['statistics']['viewCount']
    like_count = kiyan_video_details['items'][0]['statistics']['likeCount']
    comment_count = kiyan_video_details['items'][0]['statistics']['commentCount'] 
    print("Video Information : ")
    print(f"title : {title}") 
    print(f"description : {description}")
    print(f"view count : {view_count}")
    print(f"like count : {like_count}")
    print(f"comment count : {comment_count}")



    return     kiyan_video_details
