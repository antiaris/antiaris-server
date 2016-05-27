<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Demo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <link rel="shortcut icon" type="image/ico" href="/favicon.ico"/>
        <meta name="keywords" content=""/>
        <meta name="description" content="This is auto-generated by sublime-custom-insert"/>
        <meta name="revised" value="yanni4night,2016/05/12"/>
        {% for c in css %}
        <link rel="stylesheet" href="/{{c|safe}}">
        {% endfor %}
    </head>
    <body>
    <div id="react-dom">{{content | safe}}</div>
    {% for s in script %}
        <script src="/{{s|safe}}"></script>
    {% endfor %}
    {% for j in js %}
        <script src="/{{j|safe}}"></script>
    {% endfor %}
    </body>
</html>
