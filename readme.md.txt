
Hello, I have completed the challenge attached in this repository.
To Test this code just run the index.html and copy and paste the dataset
into the text area and click submit the number of turns will display
at the top of the page. Ive tested this with the sample you gave me as well as the 
bigger dataset on the challenge. 


The caluclateTurns.js file is very well documented on what each function can do,
at first i had grouped them all by vehicle till i realized that the same vehicle can
pass the instersection multiple times in that day. So what i did was first sort by vehicle, 
then by date/time, then take the object array and if an object was greater 2 which means that it
passed twice or more that day i would spit that object into two, then it re sort etc etc.

George Michael