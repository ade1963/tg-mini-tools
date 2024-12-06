import os
from tkinter import Tk, filedialog, Text, messagebox

def select_files_and_generate_output():
    """Allow users to select files from multiple folders and generate structured output."""
    # Create Tkinter root window
    root = Tk()
    root.withdraw()  # Hide the root window
    root.update()  # Ensure the window is updated

    selected_files = []

    while True:
        # Ask the user to select files (support multiple selection)
        file_paths = filedialog.askopenfilenames(title="Select Files")

        if not file_paths:
            # If no files were selected, break the loop
            if not selected_files:
                print("No files selected.")
            break

        # Add selected files to the list
        selected_files.extend(file_paths)

        # Ask the user if they want to select more files
        more_files = messagebox.askyesno("Add More Files?", "Do you want to select more files?")
        if not more_files:
            break

    if not selected_files:
        print("No files selected.")
        return

    # Prepare the output string
    output = ""
    for file_path in selected_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            # Escape triple backticks in the file content
            content = content.replace("```", "``\u200b`")  # Replace ``` with ``​`
            relative_path = os.path.relpath(file_path)  # Use relative path for better readability
            output += f"{relative_path}\n```\n{content}\n```\n\n"
        except Exception as e:
            print(f"Error reading file {file_path}: {e}")

    # Display the output in a text window
    display_output(output)

def display_output(output):
    """Display the output in a Tkinter text window."""
    text_window = Tk()
    text_window.title("Generated Output")

    # Create a Text widget
    text = Text(text_window, wrap="word")
    text.insert("1.0", output)
    text.pack(expand=True, fill="both")

    # Run the Tkinter event loop
    text_window.mainloop()

if __name__ == "__main__":
    select_files_and_generate_output()
