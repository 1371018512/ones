<?php


$adapter='mysql';
$db_config = [
    'adapter' => 'mysql',
    'host'    => '127.0.0.1',
    'port'    => '3306',
    'user'    => 'root',
    'pass'    => '',
    'name'    => 'ones_v1'
];

 $dsn = sprintf($adapter.':host=%s;dbname=%s;port=%s', $db_config['host'], $db_config['name'], $db_config['port']);

    echo "DSN: ".$dsn."\n";

    try {
        $pdo = new PDO($dsn, $db_config['user'], $db_config['pass']);
    } catch (PDOException $e) {
        send_exit_single($e->getMessage());
        return;
    }

    if($adapter === 'mysql') {
        $mysql_version = $pdo->getAttribute(PDO::ATTR_SERVER_VERSION);
        var_dump($mysql_version);
        if(version_compare($mysql_version, '5.5.5', '<')) { //
            send_exit_single('need mysql version >= 5.6.5');
            return;
        }
    }
   >
