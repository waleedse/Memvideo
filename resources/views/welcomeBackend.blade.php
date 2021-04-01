<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>memvod</title>
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=latin" rel="stylesheet">
        <link href="{{asset('css/bootstrap.min.css')}}" rel="stylesheet">
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
        <link href="{{asset('css/nifty.min.css')}}" rel="stylesheet">
        {{--  <link href="{{asset('css/bootstrap.min.css')}}" rel="stylesheet">  --}}
        <link href="{{asset('premium/icon-sets/icons/line-icons/premium-line-icons.min.css')}}" rel="stylesheet">
        <link href="{{asset('premium/icon-sets/icons/solid-icons/premium-solid-icons.min.css')}}" rel="stylesheet">
        <link href="{{asset('css/pace.min.css')}}" rel="stylesheet">
        <link href="{{asset('plugins/css-loaders/css/css-loaders.css')}}" rel="stylesheet">
        <link href="{{asset('plugins/css/animate-css/animate.min.css')}}" rel="stylesheet">
    </head>
    <body>
        <div id="root"></div>
        <script src="{{asset('js/pace.min.js')}}"></script>
        <script src="{{asset('js/jquery.min.js')}}"></script>
        <script type="text/javascript" src ="{{asset('js/app.js')}}"></script>
        <script src="{{asset('js/bootstrap.min.js')}}"></script>
        <script src="{{asset('js/nifty.min.js')}}"></script>
    </body>
</html>
