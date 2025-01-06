1. login credentials
    cache login data

2. make a post with media -> image, videos, link
    media will not be saved in the database

    
# database tables

## post
|column name|description|type|etc|
|-----------|-----------|----|---|
|post_id|id of a post|int|pk|
|content|text content of a post|string||
|media_count|how many media content this post has|int|a integer bigger than -1|
|media_start|the first id of a media|int|-1 if there is none|
|created_date|when the post is created|string|yyyy/MM/dd/hh/mm|
|deleted_date|when the post is deleted|string|yyyy/MM/dd/hh/mm, null if a post is not deleted|

## media
|column name|description|type|etc|
|-----------|-----------|----|---|
|media_id|id of a media|int|pk|
|media_name|name of the media file|string|all media will be at path "files/{media_name}"|

## credential
|column name|description|type|etc|
|-----------|-----------|----|---|
|credential_id|id of a credential|int|pk|
|guid_secret|a hidden guid|string||
|guid_public|a public guid|string||


using react, django, django REST framework

    
