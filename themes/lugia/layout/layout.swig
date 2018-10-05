<!DOCTYPE html>
<html lang="en">
  <head>
    {% include 'partials/html-header.swig' %}
  </head>

  <body>
    <div class="content">
      <!--
        env: {{ env() }}
        FTE APP: {{ app_url() }}
      -->

      {% include 'partials/site-header.swig' %}
      {{page.content}}
      {% include 'partials/site-footer.swig' %}
    </div>

    {% include 'partials/html-footer.swig' %}
  </body>
</html>
