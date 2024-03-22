SELECT
    tip_role.rol_name AS role,
    tip_resource.src_name AS resource,
    a.[action] AS action,
    rg.attributes AS attributes
FROM
    tip_role 
CROSS APPLY
    OPENJSON(tip_role.rol_grants, '$') WITH (
        resource NVARCHAR(MAX) '$.resource',
        actions NVARCHAR(MAX) '$.actions' AS JSON,
        attributes NVARCHAR(MAX) '$.attributes'
    ) AS rg
CROSS APPLY
    OPENJSON(rg.actions) WITH (
        [action] NVARCHAR(MAX) '$'
    ) AS a
JOIN
    tip_resource ON rg.resource = tip_resource.id