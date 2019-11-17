import os
import subprocess
# add icons, the file list
# isn't working because it's a directory
file_list = ['404.html', 'app.js', 
'datastore.js', 'demo.js', 'elements.js', 
'haver.js',  'index.html', 
'predictions.js', 'predictions.xml', 
'signup.html', 'stops.json', 'sw.js', 'unitrans.css', 'unitrans.html', 'upload.py', 'util.js', 'workbox-config.js']
def upload_file(filename):
    return subprocess.run(["az.cmd","storage","blob","upload","--account-name", "buslocator","--file", filename,
    "--name",filename,"--container","$web"])
if __name__ == "__main__":
    for x in file_list:
        q = upload_file(x)
        if q.returncode != 0:
            break
        