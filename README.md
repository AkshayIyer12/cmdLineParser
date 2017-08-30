# cmdLineParser
The commandLineParser takes it's input from the process.argv .
The input has to be in a specific format:
--flag=value

--flag value

-flag=value

-flag value

arbitraryValue

The Flags are added to the Map Object with their values.

The arbitrary value is added to '_' which is an array.

The commands are also taken as arbitrary value and added to the '_' array.

The commandLineParser can also parse links and filename with extensions which are appended to the '_' array.

To run the file you need to ./filename.js in your unix terminal.

Sample Input:
./commandLineParser.js --a=10 --b 20 -a=12 -b 22 git clone -u https://google.com --k=23 -d=5 -d 10 aframe -d 20 devd.txt index.js file56.html file56.html.js file5folder.html youtube.mp4.dd dd.js.html .jsf .mp4 .3mp worldStar..jpeg ..jepg.txt ..jepeg..txt

Sample Output:
Map {
  'a' => '12',
  'b' => '22',
  '_' => [ 'git',
  'clone',
  'aframe',
  'devd.txt',
  'index.js',
  'file56.html',
  'file56.html.js',
  'file5folder.html',
  'youtube.mp4.dd',
  'dd.js.html',
  '.jsf',
  '.mp4',
  '.3mp',
  'worldStar..jpeg',
  '..jepg.txt',
  '..jepeg..txt' ],
  'u' => 'https://google.com',
  'k' => '23',
  'd' => '20',
  '$0' => 'commandLineParser.js' }
