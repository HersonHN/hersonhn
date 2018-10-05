---
title: Home
name: index
date: 2018-10-4 18:00:00
jsFiles:
  - /assets/js/utils.js
  - /assets/dist/index.js
---

{% block content %}

  <main class="index-section">
    <section class="logo">
      <canvas></canvas>
      <svg version="1.1"
          id="logo_inverse"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px" y="0px" viewBox="0 0 900 1000" 
          style="enable-background:new 0 0 900 1000;"
          xml:space="preserve">
        <path style="fill: white" d="M0,0v1000h900V0H0z M766.7,400L700,600l-33.3,100L600,900l-100,0H400v0l66.7-200L500,600l0,0h0H400h-66.7L300,700H100 l33.3-100L200,400l33.3-100L300,100h100h100h0l0,0l-66.7,200L400,400l0,0h0h100h66.7L600,300h200L766.7,400z"/>
      </svg>
    </section>

    <div class="welcome">
      <p class="center"><a target="_blank" href="https://news.herson.hn/">RSS Reader</a></p>
    </div>
  </main>

{% endblock %}
