<!doctype html>
<html>
    <head>
        <title>Gist API</title>

        <!-- Import necessary JavaScript libraries --> 
        <script src="//cdnjs.cloudflare.com/ajax/libs/ace/1.1.3/ace.js" type="text/javascript" charset="utf-8"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>

        <script type="text/javascript" src="local.js"></script>

        <!-- Load stylesheets -->
        <link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css" />
        <link rel="stylesheet" type="text/css" href="style-ace.css" />

    </head>
    <body>
        <!-- File management buttons -->

        <div id="context-list">
            <div id="toolbar">
                <button id="create">Create</button><br />
                <button id="open-gist">Open Gist</button><br />
                <label for="open-file">Open Files:</label>
                <input type="file" name="open-file" id="openLocalFile" /><br />
                <button id="set-file-path">Set File Path</button>
                <button id="save">Save</button><br />
            </div>
            <ul class="project-tree">
                <div id="project-name">No Project</div>
                <ul id="file-list">

                </ul>
                
            </ul>
        </div>

        <!-- Container for two multi-function panels -->
        <div id="panels">
            <!-- Left Ace source code editor --> 	
            <div id="resizable" class="panel droppable">
                <div id="editor" class="editor"></div>
            </div>
            
            <!-- Right Ace source code editor -->   
            <div id="autodiv" class="panel droppable">
                <div id="editor2" class="editor"></div>
            </div>
        

        </div>
        <!-- Initially invisible components -->
        <div id='new-dialog' title="New Project...">
            <p>Please enter a name for your project:</p>
            <form>
                <label for="name">
                    <input type="text" name="name" id="name" />
                </label> 
            </form>
        </div>
    </body>
</html>