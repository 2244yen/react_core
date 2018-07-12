import '../../assets/styles/main.css';

function Header () {
    return (
        <nav class="navbar navbar-default ghn-navbar">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand"></a>
      </div>
      <div class="collapse navbar-collapse ghn-menu" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-right ghn-user-info">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ user ? user.name : 'User' }}<span class="caret"></span></a>
            <ul class="dropdown-menu ghn-dropdown-menu">
              <li><router-link to="/change_password">Đổi mật khẩu</router-link></li>
              <li><router-link to="/logout">Logout</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    );
}