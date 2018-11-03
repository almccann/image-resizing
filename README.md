# Image Resizing API
Streaming image resizing API.

The API accepts images (jpeg, png and webp only) in binary format
(not multipart form data) and returns the modified (or original) image.

## Setup
`npm install`
`npm run dev` // run the server in development
`npm test` // run the test suite

 ## Usage
The API supports the following requests:
- POST `/image/{file.ext}` - returns original image
- POST `/image/[key_value,key_value]/{file.ext}` - ASCII URL encoding of `[`, `]` and `,`. Returns the original images with the options applied. Options are a comma separated list with the format `key_value`
- POST `/image/m_{max}/{file.ext}` - returns the image resized with aspect ratio mantained so that the largest edge is less than or equal to the value of `max` (number) in pixels
- POST `/image/w_{width},h_{height}/{file.ext}` - ASCII URL encoding of `,`. Returns the image with the width and height resized to fit within `width` (number) and `height` (number) while maintaining aspect ratio. A specified `max` value should be ignored if width and height are specified.
- POST `/image/f_{format}/{file.ext}` - in addition to the returning the original or resized image, if a user specifies a format of `jpeg`, `png` or `webp` the image should be returned in that format and not the original format

## Request Validation
### Content-Type header
The request `Content-Type` header must match the `ext` section of the endpoint.   
For example, "Content-Type: image/jpeg" header must be included in a request URL ending in "file.jpeg".

### Accept header
No validation is undertaken on the request "Accept" header.

### Data filesize
A binary filesize limit of 2mb is applied to all requests.  

If the request data exceeds this filesize limit a 413 is returned.

## Response
### Content-Length header
Content-Length header is set.
