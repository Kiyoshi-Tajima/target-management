class Login:
    
    def __init__(self, params):
        # エラーメッセージのインスタンス変数を作成
        self.errors = {'fatal': False}
        # ログイン画面からくる値をインスタンスに設定
        for key in list(params.keys()):
            setattr(self, key, params[key])

    def valid(self):
        validate = True
        # 一旦ストレートに書きます。
        if not self.loginId:
            self.errors['loginId'] = 'ログインIDは必須入力です。'
            validate = False
        if not self.password:
            self.errors['password'] = 'パスワードは必須入力です。'
            validate = False
        return validate
    