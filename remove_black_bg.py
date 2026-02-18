from PIL import Image
import sys

def remove_black_background(image_path, output_path):
    img = Image.open(image_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    for item in datas:
        # If the pixel is black (or very close to black), make it transparent
        if item[0] < 10 and item[1] < 10 and item[2] < 10:
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python remove_black_bg.py <input_path> <output_path>")
    else:
        remove_black_background(sys.argv[1], sys.argv[2])
