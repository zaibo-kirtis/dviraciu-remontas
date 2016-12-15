select
    recordLabels.name as recordLabel,
    count(recordLabels.id) as albumCount
from
    albums
        join artists on albums.fk_Artistid = artists.id
        join recordLabels on albums.fk_Recordlabelid = recordLabels.id
        [where]
group by recordLabels.id
order by recordLabel;