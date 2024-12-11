const UserData = {
    toolsData: [],
    toolsFavorites: [],
    currentToolId: null,
    API_BASE_URL: null,

    Init() {
        //this.API_BASE_URL =`http://127.0.0.1:8000`;
        this.API_BASE_URL = `https://tools-api-ade1963.amvera.io`;
        this.currentToolId = 1;
    },

    async getFavorites(userId) {
        if (typeof (userId) != 'number') {
            return;
        }
        const apiFavoritesUrl = `${this.API_BASE_URL}/api/user/favorites/`;
        const params = new URLSearchParams({ hashed_user_id: userId });
        const url = `${apiFavoritesUrl}?${params}`;

        try {
            // Fetch data from the API
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                }
            });
            console.log(`Response status: ${response.status}`);

            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the JSON response
            UserData.toolsFavorites = await response.json();

            // Process the parsed JSON data
            UserData.toolsFavorites.forEach(tool => {
                console.log(`Tool ID: ${tool.tool_id}`);
                console.log('---');
            });

        } catch (error) {
            console.error('Error fetching tools:', error);
        }
    },

    async fetchToolSettings(hashedChatId, toolId) {
        var tool_settings = null
        UserData.toolsFavorites.forEach(tool => {
            console.log(`fetch:: Tool ID: ${tool.tool_id}`);
            console.log('---');
            if (toolId == tool.tool_id) {
                tool_settings = tool.settings;
            }
        });
        return tool_settings;
    },

    async saveToolSettings(hashedChatId, toolId, settings) {

        UserData.toolsFavorites.forEach(tool => {
            console.log(`fetch:: Tool ID: ${tool.tool_id}`);
            console.log('---');
            if (toolId == tool.tool_id) {
                tool.settings = settings;
            }
        });


        const apiUrl = `${this.API_BASE_URL}/api/user/favorites/${toolId}?hashed_user_id=${hashedChatId}`;
        const payload = {
            position: 1, // You can set it to any value
            settings: settings // Store settings
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Failed to save user preferences for tool. Status Code: ${response.status}`);
            }

            const data = await response.json();
            console.log('Tool settings saved successfully:', data);
        } catch (error) {
            console.error('Error saving user preferences:', error);
        }
    }

};
