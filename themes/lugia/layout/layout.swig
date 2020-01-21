<!DOCTYPE html>
<html lang="en">
<head>
{% include 'partials/html-header.swig' %}
</head>
<body>
<main id="page-content" class="bg-color fg-color">
<!-- {{ app_url() }} -->
{% include 'partials/site-header.swig' %}
{{page.content}}
{% include 'partials/site-footer.swig' %}
</main>
{% include 'partials/html-footer.swig' %}
</body>
</html>
