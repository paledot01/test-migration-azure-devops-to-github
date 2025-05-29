# Importante

El nombre del archivo YML (creado por SWA) en sí mismo no es lo que vincula la ejecución al Static Web App. Lo que importa es que el archivo exista en la ruta correcta dentro de tu repositorio (generalmente /workflows/) y que su contenido sea válido para el despliegue a tu SWA. Aunque en el overview del SWA aparece el nombre original del YML el nombre en si no es relevante y puede ser cambiado, y el workflow deberia seguir funcionando siempre y cuando posea los secrets creados originalmente por Azure.

Crear variables o secrets con el mismo nombre para diferentes entornos (dev, prod, staging):

- 