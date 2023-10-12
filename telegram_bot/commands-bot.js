'use strict'

const settingsController = require('../controllers/settings.controller')

const commandKeys = 
`
Format
/ab func arg

Commands
/ab settings
/ab run boolean
/ab gain n
`;

const switchCommands = async (prompt) => {
    const [ func = '', arg = '' ] = prompt.split(' ');
    let result;
    switch(func) {
        case '':
            result = commandKeys;
            break;
        case 'settings':
            result = await getSettings();
            break;   
        case 'run':
            result = await setRun(arg);
            break;
        case 'gain':
            result = await setGain(arg)
            break;
        default:
            result = 'command not found';
            break;
    }
    return result;
}

const getSettings = async () => {
    const settings = await settingsController.getSettings()
    if (settings) {
        let response = ''
        for (const [ key, value ] of Object.entries(settings.toJSON())) {
            response += `${key}: ${value}\n`
        }
        return response
    } else {
        'Error getting settings'
    }
}

const setGain = async (n) => {
    if (n) {
        try {
            const gainSetted = await settingsController.updateSettings({ gain: n })
            if (gainSetted) {
                return `gain setted in ${n}`
            } else {
                return 'Error updating gain'
            }          
        } catch (error) {
            console.error(error)
        }      
    } else {
        return 'argument expected, try:\n/ab gain 0.9'
    }
}

const setRun = async (valueBoolean) => {
    if (valueBoolean) {
        try {
            const runSetted = await settingsController.updateSettings({ run: valueBoolean })
            if (runSetted) {
                return `run setted: ${valueBoolean}`
            } else {
                return 'Error updating run'
            }
        } catch (error) {
            console.error(error)
        }
    } else {
        return 'argument expected, try:\n/ab run true'
    }
}

module.exports = switchCommands