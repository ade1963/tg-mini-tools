const UserData = {
    toolsData: [],
    toolsVaforities: [],
    currentToolId: null,
    API_BASE_URL: null,

    Init() {
        //this.API_BASE_URL =`http://127.0.0.1:8000`;
        this.API_BASE_URL =`https://tools-api-ade1963.amvera.io`;
        this.currentToolId = 1;
    },

    async getFavorities(userId) {
        if (typeof (userId) != 'number') {
            return;
        }
        const apiVaforitiesUrl = `${this.API_BASE_URL}/api/user/favorites/`;
        const params = new URLSearchParams({ hashed_user_id: userId });
        const url = `${apiVaforitiesUrl}?${params}`;
    
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
            UserData.toolsVaforities = await response.json();
    
            // Process the parsed JSON data
            UserData.toolsVaforities.forEach(tool => {
                console.log(`Tool ID: ${tool.tool_id}`);
                console.log('---');
            });

        } catch (error) {
            console.error('Error fetching tools:', error);
        }
    },

    async fetchToolSettings(hashedChatId, toolId) {
        const apiUrl = `${this.API_BASE_URL}/api/user/favorites/?hashed_user_id=${hashedChatId}`;
    
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error(`Failed to fetch user preferencies. Status Code: ${response.status}`);
            }
    
            const data = await response.json();
    
            // Find the favorite for the given tool_id
            const favorite = data.find(fav => fav.tool_id === toolId);
    
            if (favorite && favorite.settings) {
                return favorite.settings;
            } else {
                console.log('No tax rate found for the specified tool.');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user preferencies:', error);
            return null;
        }
    },

    async saveToolSettings(hashedChatId, toolId, settings) {
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
                throw new Error(`Failed to save user preferencies for tool. Status Code: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Tax rate saved successfully:', data);
        } catch (error) {
            console.error('Error saving user preferencies:', error);
        }
    }

};
