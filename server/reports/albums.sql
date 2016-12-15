select
    albums.title as album,
    recordLabels.name as recordLabel,
    artists.name as artist
from
    albums
        join artists on albums.fk_Artistid = artists.id
        join recordLabels on albums.fk_Recordlabelid = recordLabels.id
        [where]
order by album;

