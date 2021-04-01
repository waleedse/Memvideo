<html>
<head>
    <style>
        .wrapper_div {
            height: auto;
            width: 100%;
        }

        header {
            text-align: center;
            font-size: 30px;
            font-family: sans-serif;
            color: #2db7c5;
        }

        section {
            width: 60%;
            margin: 0 auto;
            display: block;
        }

        .button_center {
            width: 23%;
            margin: 0 auto;
        }
        .bold {
            font-weight: bold;
        }

    </style>
</head>
<body>
<div class="wrapper_div">
    <header>
        <h3>Contact Us</h3>
    </header>
    <section>
    <p>
        <b>{{$data->name}} </b><br>
        {{$data->number}}<br>
        {{$data->description}}
    </p>
    </section>
    <footer>
        
    </footer>
</div>
</body>
</html>