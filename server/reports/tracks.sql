select
    tracks.title as track,
    artists.name as artist,
    genres.name as genre
from
    tracks
        join genres on tracks.genre = genres.id_Genre
        join albums on tracks.fk_Albumid = albums.id
        join artists on albums.fk_Artistid = artists.id
    [where]
order by artist