<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>memvod</title>
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=latin" rel="stylesheet">
        {{-- <link href="{{asset('css/bootstrap.min.css')}}" rel="stylesheet"> --}}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"/>
        {{-- <link href="{{asset('css/nifty.min.css')}}" rel="stylesheet"> --}}
        {{-- <link href="{{asset('premium/icon-sets/icons/line-icons/premium-line-icons.min.css')}}" rel="stylesheet">
        <link href="{{asset('premium/icon-sets/icons/solid-icons/premium-solid-icons.min.css')}}" rel="stylesheet"> --}}
        {{-- <link href="{{asset('css/pace.min.css')}}" rel="stylesheet"> --}}
        <link href="{{asset('plugins/css/animate-css/animate.min.css')}}" rel="stylesheet">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

    </head>
    <body>
        <div id="root"></div>
        {{-- <script src="{{asset('js/pace.min.js')}}"></script> --}}
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        {{-- <script src="{{asset('js/jquery.min.js')}}"></script> --}}
        <script type="text/javascript" src ="{{asset('js/app.js')}}"></script>
        
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        {{-- <script src="{{asset('js/nifty.min.js')}}"></script> --}}
    </body>
</html>
