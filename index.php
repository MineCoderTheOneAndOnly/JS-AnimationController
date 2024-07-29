<!DOCTYPE html>
<html lang="en" id="body" class="custom-scrollbar">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="animationController.js"></script>
</head>
<script>
    $(document).ready(function () {
        /*$('#test').animate({
            height: "200px"
        }, {duration:2000, queue:true})

        $('#test').animate({
            width: "200px"
        }, {duration:2000, queue:false}).delay(5000)
        .animate({
            width: "400px"
        }, 1000);
        $('#test1').animate({
            width: "200px"
        }, 2000)*/

        var controller = new AnimationController();
        controller.startAnimation();

        /*$('#test').fadeOut(2000).delay(5000).fadeIn(2000).queue(()=>{$('#test1').animate({
            width: "200px"
        }, 2000)});*/
    });
</script>

pos<br>
size<br>
scroll<br>
visibility/fading<br>

<body>
    <div id="test" style="width: 100px; height: 100px; background-color: red; overflow:auto;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci aspernatur quod beatae quam itaque recusandae! Error placeat numquam itaque praesentium magni dolore sint amet architecto molestiae. Ullam, dolores? Voluptatibus, error.
    Mollitia dolor asperiores, blanditiis nesciunt molestiae tempora, sint ipsum tenetur voluptates sequi maxime laboriosam enim repellat vitae atque eveniet aspernatur inventore quam expedita dolorem sunt? Magnam eius alias ab assumenda!
    Magni sunt dicta similique, aliquam veritatis fugiat velit eligendi ea sequi voluptas corrupti porro. Dolorem eaque, quas incidunt exercitationem, autem ratione, architecto odio dignissimos dolores nisi deserunt tempora esse velit.
    Quo, accusantium dolor reprehenderit autem velit inventore enim officia similique deleniti quidem odit quae nobis facilis atque doloremque tempora quasi consequatur eligendi, assumenda pariatur saepe. Placeat nemo ab iusto architecto!</div>
    <div id="test1" style="width: 100px; height: 100px; background-color: blue;"></div>
</body>

</html>