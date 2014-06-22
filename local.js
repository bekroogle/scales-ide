
            // jQuery
            $(document).ready(function() {
                

                // Turn the left editor div (#editor) into an Ace editor:
                editor = ace.edit('editor');
                editor.setTheme('ace/theme/monokai');
                editor.getSession().setMode('ace/mode/scala');
                
                // debug
                editor.setValue("123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890");
                // end-debug

                editor.setOption("wrap","free");                

                // Turn the right editor div (#editor2) into an Ace editor:
                editor2 = ace.edit('editor2');
                editor2.setTheme('ace/theme/monokai');
                editor2.getSession().setMode('ace/mode/scala');
                
                // debug
                editor2.setValue("123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890");
                // end-debug

                editor2.setOption("wrap","free");                
                
                // Set up toolbar button events

                // Create new file
                $('#create').click( function() {
                    var filename = prompt("Please enter the name of your project:");
                    create_gist(filename);

                });
                
                $('#open').click( function() {
                    var gistid;
                    gistid = prompt("Please enter the Gist ID of the project:","8482d9c61e1bd78dcc79");
                    if (gistid) {
                        open_gist(gistid);
                    }

                })

                // Make context-list resizable:
                $('#context-list').resizable({
                    handles: "e"
                });

                // Automatically resize the panels to the right:
                $('#context-list').resize( function(){
                    $('#panels').css('left', 
                        $('#context-list').css('width'));
                });

                // Set resizable container for left Ace editor:
                $( "#resizable" ).resizable({
                    // Handle can be selected as $('.ui-resizable-e').
                    handles: "e"
                });

                // Triggered when panel is resized:
                $("#resizable").resize( function() {
                    
                    // Notify Ace to update its size:
                    editor.resize();

                    // Automatically resize right panel to fill the 
                    // remainder of div#panels:
                    $('#autodiv').css("left",$("#resizable").css("width"));
                    $('#autodiv').css("right", "0");
                    
                    // Notify Ace to update its size:
                    editor2.resize();
                }); // $("#resizable").resize

                // Make items in the context-list draggable:
                // $('.draggable').draggable({
                //     helper: 'clone',
                //     zIndex: 100,
                //     revert: "invalid"
                // });

                // Make the panels received drag & dropped items:
                $('.droppable').droppable({
                    accept: '.draggable',
                    over: function() {
                        $('.editor').addClass('highlight');
                    },
                    out: function() {
                        $('.editor').removeClass('highlight');
                    },
                    drop: function() {
                        load_file($(this).attr('id'));
                        console.log(this);
                    }
                })

            }); // $(document).ready
            
            function load_file() {
                
            }
    

            // Create a new Gist with the supplied file name (using a POST
            // request--non-functional in jQuery):
            function create_gist(filename) {
                
                // Process server's response:
                function reqListener () {
                    console.log(this.responseText);
                }

                // Make POST request:
                var oReq = new XMLHttpRequest();
                oReq.onload = reqListener;
                oReq.open("post", "https://api.github.com/gists", true);
                oReq.send('{"description": "New Scales Project", "public": \
                            "true","files": {"'+filename+
                            '": {"content": "please please"}}}');
            } // create_gist

            // Open a Gist with the provided Gist ID (using a GET request)
            function open_gist(gistid) {
                console.log(gistid);
                ace.edit("editor").setValue("");

                $.ajax({
                    url: 'https://api.github.com/gists/' + gistid,
                    type: 'GET',
                    dataType: 'jsonp'
                }).success( function(gistdata) {
                    $('#project-name').html(gistid.toString()+":");
                    $('#file-list').html('');
                    for (file in gistdata.data.files) {
                        $('#file-list').append('<li id="'+file+'" class="draggable">'+file+'</li>');
                    }
                    global_gist_data = gistdata;
                    $('.draggable').draggable({
                        helper: 'clone',
                        zIndex: 100,
                        revert: "invalid"
                    });
                }); // $.ajax

            }