# Notas :

1. La migracion del repositorio de Azure Devops a Github lo realicé haciendo un _mirror_, este sobreescribio las ramas existentes, sin necesidad de hacer un force. Este método trajo todas las ramas y el historial de commits de cada uno, pero no trajo los PRs.

[Github - Duplicating a repository - mirror](https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository#mirroring-a-repository)

2. Para que te permita desplegar de manera manual, se debe agregar `workflow_dispatch` dentro de `on` y agregar esta condicional en el `if` dentro de `build_and_deploy_job`.

3. En el workflow el valor de `output_location` (localización del build) en un proyecto de react es usualmente `dist`. Azure por defecto le coloca `build` tendrás que cambiarlo.

4. El workflow podría detectar una versión de node incorrecta, si es necesario se debe setear la version en el `package.json`.

```json
   "engines": {
   "node": "20.x"
   }
```

5. Al crear una instancia de SWA, Azure crea automáticamente un workflow en la rama especificada dentro de tu repositorio, ademas agrega dentro de este un **secret** con el **token** del SWA. Este token es el único valor que se necesita para para vincular el workflow al SWA (este valor se puede obtener en el _overview_ del SWA). Esto te permite crear el workflow de manera manual, solo necesitas un archivo YML dentro de una carpeta `.github/workflows` en la raíz del repo y crear el **secret** con el **token** del SWA y usarlo dentro del workflow. Esto a su vez te permite tener un SWA para un frontend y desplegarlo desde un workflow, un pipeline o cuantos YMLs quieras desde distintas plataformas.

```yml
azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_THANKFUL_HILL_06F20210F }}
```

6. Variables y Secrets, Environment y Repository. Las variables o secretos de Repositorio se comparten entre todos los entornos o ramas (dev, prod). Las variables o secretos de Entorno solo se usan en los entornos específicos, y estos se definen en el workflow, en el ejemplo este workflow se usara la variable VITE_TEST_ENV que este en el entorno development, de esta manera podémos tener variables o secrets con el mismo nombre pero deben estar en distintos entornos. Para crear un entorno entras a `tu_repositorio / settings / Environments / New environment / tu_environment / Add environment secret o variable`.

```yaml
environment:
name: development
env:
VITE_TEST_ENV: ${{ vars.VITE_TEST_ENV }}
```

7. De forma predeterminada, al implementar un sitio en Azure Static Web Apps cada Pull Request implementa una version preliminar del sitio disponible a través de una dirección URL Temporal. Esta version del sitio le permite revisar los cambios antes de hacer merger al PR. Una vez cerrada el PR el entorno temporal desaparece.

[Static Web App - preview environments](https://learn.microsoft.com/en-us/azure/static-web-apps/preview-environments)

## Mirror parcial (para mantener historial de las ramas) :
Esto sube solo una rama del clone bare, hacia el nuevo repositorio con la opción de poder cambiarle el nombre a la rama para el nuevo repositorio. Si quieres mantener el nombre de la rama original solo colocas el mismo en ambos lados.
``` bash
git clone --bare https://github.com/EXAMPLE-USER/OLD-REPOSITORY.git
cd OLD-REPOSITORY
git remote add github https://github.com/EXAMPLE-NEW-USER/NEW-REPOSITORY.git
git push github OLD-BRANCH-NAME:NEW-BRANCH-NAME
```
## El Entendimiento del deploy manual (basado en pruebas) :
Una rama debe tener los workflows de los entornos en las que podría desplegar. Si una rama solo tiene un workflow para el entorno staging, esta rama solo podría ser desplegado a este entorno.
Funciona igual para el despliegue manual, solo puedes desplegar una rama a un entorno especifico solo si esa rama tiene el workflow respectivo.

#### Pasos para activar el despliegue manual en Github:
1. En el Workflow agregar `workflow_dispatch` dentro de `on` y agregar esta condicional en el `if` dentro de `build_and_deploy_job`.
2. Agregar este mismo workflow a la rama principal (`main`), esta rama es importante para GitHub, si no esta en esta rama no podrás desplegar manualmente.

#### Pasos para activar el despliegue manual en VSCode:
1. En el Workflow agregar `workflow_dispatch` dentro de `on` y agregar esta condicional en el `if` dentro de `build_and_deploy_job`.
2. Descargar la extension “*Github Actions*” en VSCode.
3. Logearte en la extención y verás un botón de “*play*”, que podrás apretar e indicando la rama que quieres desplegar (*refs/heads/dev*), funcionará siempre y cuando el mismo workflow este en dicha rama.
