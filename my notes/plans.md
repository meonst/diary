1. login credentials
    cache login data

2. make a post with file -> image, videos, link
    file will not be saved in the database

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

 - video ui, photo ui => for posts with file



file by type

text: show a few lines and a downloadable link
image: show image
video: show video
etc: provide downloadable link




 