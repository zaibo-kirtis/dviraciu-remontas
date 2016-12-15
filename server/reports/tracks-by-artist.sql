select
    count(tracks.id) as trackCount,
    artists.name as artist
from
    tracks
        join genres on tracks.genre = genres.id_Genre
        join albums on tracks.fk_Albumid = albums.id
        join artists on albums.fk_Artistid = artists.id
    [where]
group by artist
order by trackCount desc
