 <?php

                shell_exec("/usr/local/bin/gpio -g mode 17 out");
                if(isset($_POST['checkbox_name'])&& $_POST['checkbox_name']=='OFF')
                {
                echo "LED is off";
                shell_exec("/usr/local/bin/gpio -g write 17 0");
                }
                else
                {
                echo "LED is on";
                shell_exec("/usr/local/bin/gpio -g write 17 1");
                }
                ?>