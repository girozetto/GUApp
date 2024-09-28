const getOra = async ()=>{
    const { default: ora } = await import('ora');
    return ora;
}

const getChalk = async ()=>{
    const { default: chalk } = await import('chalk');
    return chalk;
}

const startTask = async (message) => (await getOra())(message).start();

const succeedTask = async (spinner, message) => spinner.succeed(await greenMessage(message));
const redMessage = async (message) => (await getChalk()).red(message);
const greenMessage = async (message) => (await getChalk()).green(message);
const failTask = async (spinner, message) => spinner.fail(await redMessage(message));

module.exports = {
    startTask,
    succeedTask,
    failTask,
    redMessage,
    greenMessage
};
