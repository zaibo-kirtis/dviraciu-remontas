select
    artists.name as artist,
    count(artists.id) as albumCount
from
    albums
        join artists on albums.fk_Artistid = artists.id
        join recordLabels on albums.fk_Recordlabelid = recordLabels.id
        [where]
group by artists.id
order by artist;