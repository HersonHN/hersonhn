
<title>
  {{ hexo.config.title }} {% if page.title %} - {{ page.title | title }} {% endif %}
</title>

<meta charset="utf-8">
<meta name=viewport content="width=device-width,initial-scale=1">

<meta name="description" content="Herson Salinas' webste">
<meta name="robots" content="index,follow">

<link rel="stylesheet" href="/assets/scss/master.css">
<link rel="stylesheet" href="/assets/css/fontello/css/fontello-embedded.css">

{% for fileName in page.cssFiles %}
<link rel="stylesheet" href="{{ fileName }}">
{% endfor %}

{% include 'google-analitics.swig' %}


