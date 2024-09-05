"""Use nbconvert to generate pdfs of an assignment.

"""

import os
import shutil
import pwd
import argparse
import stat
from datetime import datetime

now = datetime.now()
date_time = now.strftime("%m/%d/%y %H:%M:%S")


import nbformat as nbf

findex = open('./docs/lecture_slides.html','w')

opener = """
<!DOCTYPE html>
<html>
<head></head>
<body><h1 style="text-align: center">ES302 Lecture Slides</h1>
<p style="text-align: center"> Last Updated:    """+str(date_time)+"""</p>
<div style="border: solid 2px black; border-radius: 10px; text-align: center; width: 50vw;margin-left: auto; margin-right: auto">
<br><br>

<h3><a href="https://alexanderallenbrown.github.io/ES302_FA24_Students/index.html">Return to Course Page</a></h3>
"""

closer = """
<br><br>
</div>
</body>
</html>
"""

findex.write(opener)

alphabet = "._ !0123456789MWFABCDEGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz?"


def set_permissions(path, uid, gid):
    os.chown(path, uid, gid)
    if os.path.isdir(path):
        os.chmod(path, stat.S_IRUSR | stat.S_IRGRP | stat.S_IXUSR | stat.S_IXGRP)
    else:
        os.chmod(path, stat.S_IRUSR | stat.S_IRGRP)


def main():
    last_rel_dir = ''
    findex.write("<h2><u>Released Slides</u></h2>\r\n")
    source_dir = os.path.abspath(".")
    docdir = os.path.relpath("./docs/")
    for root, dirs, files in os.walk(source_dir):
        # dirs.sort(key=lambda word: [alphabet.index(c) for c in word])
        dirs.sort()

        for file in files:
            rel_dir = os.path.relpath(root, source_dir)
            if file.endswith(".ipynb") and not "checkpoint" in file and "slides" in rel_dir:
                dst = os.path.join(docdir,rel_dir)
                # convertcmdpre = "jupyter nbconvert "+"--execute --allow-errors --to html_toc --template templates/source_nb.tpl --output-dir "+dst+" "+os.path.join(rel_dir.replace(" ","\ "),file.replace(" ","\ "))
                convertcmdpre = "jupyter nbconvert --to slides   --no-input --no-prompt --output-dir " +dst+" "+os.path.join(rel_dir.replace(" ","\ "),file.replace(" ","\ "))
                os.system(convertcmdpre)
                #modify links inside thie html file
                # Read in the file
                htmlfilename = os.path.join(dst,file[0:-5]+'slides.html')
                print("HTML FILE: "+htmlfilename)
                with open(htmlfilename, 'r') as htmlfile :
                  filedata = htmlfile.read()
                htmlfile.close()
                # Replace the target string
                filedata = filedata.replace('ipynb', 'html')
                with open(htmlfilename, 'w') as htmlfile :
                    htmlfile.write(filedata)
                htmlfile.close()

                link = "<a href="+str(os.path.join(rel_dir,file[0:-5]+"slides.html"))+">"+file[0:-6]+"</a>"
                findex.write("<p>\r\n")
                findex.write(link+"\r\n")
                findex.write("</p>\r\n")

    findex.write(closer)
    findex.close()




if __name__ == "__main__":
    main()
