
{% for fileName in page.jsFiles %}
  <script src="{{ fileName }}?{{ version() }}"></script>
{% endfor %}