1. login credentials
    cache login data

2. make a post with media -> image, videos, link
    media will not be saved in the database

3. two types of posts long and short

using next js

    


home
 - show lists of short posts
 - a form where i can make short posts

post/[id]
 - a detailed view of a post
 - do i want user interaction? not quite...

post/[id]/edit
 - a way to edit a post
 - there will also be a delete button(but it actually will be a button to hide it, not actually deleting the post from the database)

post/search?params
 - searching posts by a keyword or see posts by categories
 - the default category will be empty but for posts with a certain length or higher, or has a image, it must have a category

about
 - about me!

login
 - so that i can login from different devices


ui components
 - top/side navigation bar, top for mobile environments, side for pc environment, hidden when scrolling down on mobile
 
 - single_post => ui used in home and search, show multiple(i'm thinking top 50 + doomscrolling)

 - video ui, photo ui => for posts with media



# database tables

## post
|column name|description|type|etc|
|-----------|-----------|----|---|
|post_id|id of a post|str|pk, going to use uuid|
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


CREATE EXTENSION IF NOT EXISTS "uuid-ossp"

CREATE TABLE IF NOT EXISTS POSTS (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content VARCHAR(9999),
    title VARCHAR(256),
    created_date DATE NOT NULL,
    is_hidden BOOL NOT NULL    
)

CREATE TABLE IF NOT EXISTS MEDIA (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    url VARCHAR(9999),
    title VARCHAR(256),
    created_date DATE NOT NULL,
    is hidden BOOL NOT NULL
)




 