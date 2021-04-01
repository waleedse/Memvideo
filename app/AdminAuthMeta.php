<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdminAuthMeta extends Model
{
    protected $table = 'admin_auth_metas';
    protected $fillable = [
    	'token',
        'ip',
        'admin_id',
        'token_valid_till',
		'status',
    	'created_at',
    	'updated_at'
    ];
}
