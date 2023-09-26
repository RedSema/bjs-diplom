const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((result) => {
        if (result.success) {
            location.reload();
        }
    })
};

ApiConnector.current((result) => {
    if (result.success) {
        ProfileWidget.showProfile(result.data);
    }
});

const ratesBoard = new RatesBoard();

const loadStocks = () => {
    ApiConnector.getStocks((result) => {
        if (result.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(result.data);
        }
    });
}

loadStocks();
setInterval(loadStocks, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (result) => {
        if (result.success) {
            ProfileWidget.showProfile(result.data);
            moneyManager.setMessage(result.success, 'Баланс пополнен!')
        } else {
            moneyManager.setMessage(result.success, result.error);
        }
    });
};

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (result) => {
        if (result.success) {
            ProfileWidget.showProfile(result.data);
            moneyManager.setMessage(result.success, 'Конвертация выполнена!')
        } else {
            moneyManager.setMessage(result.success, result.error);
        }
    });
};

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (result) => {
        if (result.success) {
            ProfileWidget.showProfile(result.data);
            moneyManager.setMessage(result.success, 'Перевод выполнен!')
        } else {
            moneyManager.setMessage(result.success, result.error);
        }
    });
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((result) => {
    if (result.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(result.data);
        moneyManager.updateUsersList(result.data);
    }
});

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (result) => {
        if (result.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(result.data);
            moneyManager.updateUsersList(result.data);
            favoritesWidget.setMessage(result.success, 'Пользователь добавлен!')
        } else {
            favoritesWidget.setMessage(result.success, result.error);
        }
    })
};

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (result) => {
        if (result.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(result.data);
            moneyManager.updateUsersList(result.data);
            favoritesWidget.setMessage(result.success, 'Пользователь удален!')
        } else {
            favoritesWidget.setMessage(result.success, result.error);
        }
    })
};